export interface DiaryItem {
    path: string; // 确保包含 path
    frontmatter: {
        title: string;
        description?: string; // 根据实际情况调整
        data: string;
    };
}
export interface headerListInter {
    title: string;
    href: string;
}
export interface AListInter {
    title: string;
    linkArray: linkInter[];
}
export interface linkInter {
    href: string;
    h2title: string;
    hrefName: string;
    note: string;
}