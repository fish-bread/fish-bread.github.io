import { createContentLoader } from 'vitepress'
import {MarkdownListInterface} from "./Markdown";

// 需要修改：去掉 slice(0, 5)，返回所有数据
export default createContentLoader('blog/**/*.md', {
    includeSrc: true,
    render: false,
    excerpt: false,

    transform(rawData): MarkdownListInterface[] {
        const allData = rawData.map(({ url, frontmatter }) => {
            const fm = frontmatter as any
            return {
                title: fm.title || '无标题',
                titleBackground: fm.titleBackground || null,
                description: fm.description || '无文本摘要',
                tags: fm.tags || [],
                Category: fm.category || '网页',
                writtenDate: fm.writtenDate || '无日期',
                updatedDate: fm.updatedDate || '无日期',
                url: url || 'http://localhost:5173/404',
            }
        })

        // 只排序和过滤，不限制数量，返回所有数据
        return allData
            .filter(item => item.writtenDate !== '无日期')
            .sort((a, b) => new Date(b.writtenDate).getTime() - new Date(a.writtenDate).getTime())
        // 删除 .slice(0, 5)
    }
})