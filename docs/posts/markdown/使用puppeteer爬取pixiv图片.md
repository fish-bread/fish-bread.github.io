---
layout: Layout
title: 使用puppeteer爬取pixiv图片
data: 2025/09/12
description: 这是一篇关于如何使用puppeteer爬取pixiv图片
---
# puppeteer结合axios及代理请求根据pid爬取pixiv图片
最近在学习网络爬虫,网络上有很多关于python爬虫的案例与教程以及对应的库,但是关于puppeteer的近期案例却很少,
特别是用puppeteer爬取pixiv图片的讲解很少或年代久远(至少在我的搜索下是这样的),所以我想写一遍puppeteer博客以供自己和他人随时查阅  
本人技术欠佳,还请谅解
# 依赖库
> puppeteer只能在node环境使用,请确保node版本不要太低(本人node版本为v22.18.0)
```bash
npm i puppeteer #puppeteer标准库,绑定下载一个chrome浏览器
npm i puppeteer-core #puppeteer-core是puppeteer的核心库,没有绑定chrome浏览器
npm i axios #一个请求库,本文用于向pixiv服务器发起get请求
```
# 开始
## 解决登录
在爬取pixiv图片时并不强制请求是非登录状态,但是可能会导致图片爬取不全,所以最好是进行已登录状态的请求,即向请求添加cookies后请求
### 老旧的操作
根据我高强度在浏览器搜索登录爬取pixiv图片的方法,以下方法已无效或者存疑
1. python通过账号密码和其他参数使用post请求自动登录pixiv(pixiv对登录请求进行了更新,目前这种登录方式获取cookies比较困难)
### 获取cookie
获取用户cookie的方法大致有几种
1. POST 请求方法,获取返回后的cookie
2. puppeteer获取元素执行点击,监听请求事件,提取cookie
3. 结合pyautogui模拟用户登录,结合python其他库,监听请求事件获取cookie
4. 手动获取cookie
介于前三种我还没有实践过,所以使用第4种方案获取
#### 手动获取pixivCookie
随便打开一个已登录的pixiv页面,例如打开pixiv主页,[https://www.pixiv.net/](https://www.pixiv.net/),
打开主页后按F12或ctrl+shift+i或右键点击菜单栏的检查打开控制台
![pixiv主页控制台](/markdown_img/pixiv/1.png 'pixiv主页控制台')
点击控制台到网络,然后点击筛选器中的文档
![网络控制台](/markdown_img/pixiv/2.png '网络控制台')
在文档中会有一个请求,点击该请求,如过没有,请刷新页面
![pixiv主站请求](/markdown_img/pixiv/3.png 'pixiv主站请求')
寻找请求中请求标头的cookie,这个cookie就是当前账号的cookie,后续我们就可以通过向请求代入cookie模拟用户已登录
# 寻找图片url
要根据pid或网址爬取图片,最重要就是获取图片的url,只要获取到了图片url我们就可以向主站发送get请求并下载图片到本地  
## 通过pixivApi获取所有图片链接
最初我试图在pid网址去进行网络监听获取图片url,但是我发现虽然在pid网址是单个图片时可以获取,
但是在面对pid网址是多个图片时,网络监听无法获取全部图片url,根据我的查询发现pixiv有一个api可以用于获取单个pid网址的全部图片url  
<mark>https://www.pixiv.net/ajax/illust/插画id/pages?lang=zh</mark>  
这个api会打印当前pid网址所需的所有图片,包括原图,压缩图等,例如打开  
[https://www.pixiv.net/ajax/illust/134451163/pages?lang=zh](https://www.pixiv.net/ajax/illust/134451163/pages?lang=zh)
可以清晰看见该pid下所有图片链接,其中
![pixiv主站请求](/markdown_img/pixiv/4.png 'pixiv图片链接数组')
中的original链接便是该张图片的原图链接,我们要找到的就是这个(~~毕竟都爬图了,不爬个高清图片吗?~~)
<mark>所以,爬取pixiv图片的思路就是,手动获取cookie,根据用户输入的pid值自动查询apiPid网址获取全部图片链接数组,通过axios遍历请求爬取图片</mark>
## 自动化获取图片链接
启动puppeteer
> 注意这里使用的是puppeteer-core,需要自己自定puppeteer启动的chrome浏览器  
> 注意:这里的代码都是写在PuppeteerCore类中的,注意方法的调用问题
```ts
import puppeteer from 'puppeteer-core'
import type { Browser, Page } from 'puppeteer-core'
class PuppeteerCore {
    browser: Browser | null = null
    runPuppeteer = async (): Promise<void> => {
        this.browser = await puppeteer.launch({
            executablePath: chromePath, //chromePath更换为你的浏览器路径
            headless: false, //默认无头模式
            defaultViewport: {
                width: 1500,
                height: 720
            }
        })
    }
}
```
启动新页面
```ts
const page = await this.browser.newPage()
await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
)
```
根据用户输入的pid或pid链接通过正则表达式获取pid网址和apiPid网址
```ts
interface pixivHrefInter {
    ajaxHref: string
    imgHref: string
}
/**
 * 分析用户输入的网址或pid
 * @param {string} href //用户输入的pid网址或pid
 */
analyzeHrefFunc = async (href: string): Promise<pixivHrefInter | null> => {
    const pixivArtworkIdPattern =
        /(?:(?:https?:\/\/)?(?:www\.)?pixiv\.net\/artworks\/)?(\d+)(?:\?[^#\s]*)?/i
    // 尝试从输入字符串中匹配pid
    const match = href.match(pixivArtworkIdPattern)
    if (match && match[1]) {
        // 如果匹配成功，提取pid并构建标准URL
        const pid = match[1]
        const imgHref = `https://www.pixiv.net/artworks/${pid}`
        const ajaxHref = `https://www.pixiv.net/ajax/illust/${pid}/pages?lang=zh`
        return {
            ajaxHref: ajaxHref,
            imgHref: imgHref
        }
    } else {
        // 如果输入无法识别，可以根据需要返回默认值或抛出异常
        console.error('无法从输入中提取有效的Pixiv艺术作品ID:', href)
        return null
    }
}
```
由于新版puppeteer对page.setCookie在文档中表明了弃用并推荐使用browser.setCookie,所有这里为browser设置全局cookie
```ts
/** 
 * 设置pixivCookie
 * @param {string} cookieSet //用户的原始cookie
 */
setPixivCookie = (cookieSet: string): void => {
    const cookies = cookieSet.split('; ').map((pair) => {
        const [name, ...valueParts] = pair.split('=')
        const value = valueParts.join('=')
        // 对URL编码的值进行解码
        const decodedValue = decodeURIComponent(value || '')
        // 返回完整的Cookie对象
        return {
            name: name.trim(),
            value: decodedValue,
            domain: '.pixiv.net',
            path: '/',
            secure: true,
            httpOnly: false,
            sameSite: 'Lax' as const
        }
    })
    this.browser?.setCookie(...cookies)
}
//设置cookies
this.setPixivCookie(PixivCookie.getCookies())
```
## 获取图片原始链接数组
其次根据ajaxHref用puppeteer去打开该网页并进行网络监听获取全部图片原始链接,
因为api网址默认请求一个以该网址为链接的get请求,所以我们就可以直接去通过网络监听匹配该请求,
然后用await response.json()(该方法直接转化json为js对象)获取该请求的json数据,
用数组的map方法遍历返回全部的original组成一个新数组并返回出去
```ts
/**
 * 查询图片函数
 * @param {Page} page //页面实例
 * @param {string} href //ajaxhref链接
 */
interface searchPixivInter {
    urlsArray: string[]
    PageUrl: pixivHrefInter
}
searchPixivFunc = async (page: Page, href: string): Promise<searchPixivInter | null> => {
    const PageUrl = await this.analyzeHrefFunc(href) //调用前面的查询函数
    if (!PageUrl) {
        puppeteerPrintFunc('error', `puppeteer报错,链接无效或找不到图片`)
        return null
    }
    //监听网络请求,获取全部图片链接
    let pageText: pixivBodyInter
    let urlsArray: string[] = []
    page.on('response', async (response) => {
        if (response.url() === PageUrl.ajaxHref) {
            console.log('请求', response.url())
            pageText = await response.json()
            urlsArray = pageText.body.map((allUrl) => {
                return allUrl.urls.original
            })
            puppeteerPrintFunc(
                'success',
                `成功获取到${urlsArray.length}张图片,所有原始图片链接数组, ${urlsArray}`
            )
            return
        }
    })
}
//调用查询函数
const searchData = await this.searchPixivFunc(page, data.href)
```
# 下载图片
执行以上操作后就可以进行遍历下载操作
```ts
//下载图片函数
import { HttpsProxyAgent } from 'https-proxy-agent'
import axios from 'axios'
const host = '127.0.0.1'
const port = 7897
const httpsAgent = new HttpsProxyAgent(`http://${host}:${port}`)
//这是设置http代理去请求pixiv用于防止请求被墙,如何你可以直接访问,或代理端口不是7897,请在这里修改
export const pixivAxios = axios.create({
    proxy: false,
    timeout: 25000,
    httpsAgent
})
interface searchPixivInter {
    urlsArray: string[]
    PageUrl: pixivHrefInter
}
downloadPixivAxios = async (searchData: searchPixivInter): Promise<void> => {
    //获取路径
    const downloadDir = pixivPath.getPath() //路径获取位置,根据你的函数或路径字符串设置
    puppeteerPrintFunc('success', `图片将保存至目录: ${downloadDir},开始遍历下载图片`)
    puppeteerPrintFunc('success', `下载图片时可能不会打印,请耐心等待`)
    for (let i = 0; i < searchData.urlsArray.length; i++) {
        try {
            //将url作为文件名
            const imageUrl = searchData.urlsArray[i]
            const urlObj = new URL(imageUrl)
            const fileName = urlObj.pathname.split('/').pop() || `image_${i}.jpg`
            const filePath = join(downloadDir, fileName)
            //请求图片
            const response = await pixivAxios({
                headers: {
                    Referer: searchData.PageUrl.imgHref,
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    Cookie: PixivCookie.getCookies()
                },
                url: searchData.urlsArray[i],
                responseType: 'stream'
            })
            //获取文件总长度
            let downloadedSize = 0
            const contentLength = parseInt(response.headers['content-length'])
            //检查图片是否路径文件夹是否存在
            if (!fs.existsSync(downloadDir)) {
                fs.mkdirSync(downloadDir, { recursive: true })
            }
            // 创建写入流
            const writer = fs.createWriteStream(filePath)
            //写入数据
            response.data.pipe(writer)
            //生成唯一uuid
            const taskId = uuidv4()
            //更新进度
            response.data.on('data', (chunk: Buffer) => {
                downloadedSize += chunk.length
                const progress =
                    contentLength > 0 ? Math.round((downloadedSize / contentLength) * 100) : 0
                puppeteerProgressFunc('success', progress, taskId)
            })
            response.data.on('end', () => {
                puppeteerProgressFunc('closed', 100, taskId)
                puppeteerPrintFunc('success', `成功下载: ${fileName},正在保存到本地`)
                downloadedSize = 0
            })
            // 等待下载完成
            await new Promise<void>((resolve, reject) => {
                writer.on('finish', () => {
                    puppeteerPrintFunc('success', `成功保存: ${fileName}图片到本地`)
                    resolve()
                })
                writer.on('error', (error) => {
                    puppeteerPrintFunc('error', `下载图片${fileName}失败,请检查vpn或网路是否正常`)
                    reject(error)
                })
            })
        } catch (e) {
            console.error('axios请求报错', e)
            puppeteerPrintFunc(
                'error',
                `获取图片${searchData.urlsArray[i]}失败,请检查vpn或网路是否正常`
            )
        }
    }
}
//调用下载图片
await this.downloadPixivAxios(searchData)
```
# 尚未完成的优化
1. 对请求的睡觉睡眠防止pixiv检查
2. 对代码的通用化
# 结束