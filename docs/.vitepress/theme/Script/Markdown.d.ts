//类别库
export type CategoryInterface = "游戏" | "网页" | "unity" | "未分类"
export interface MarkdownListInterface {
    title: string;
    titleBackground?: string | null;
    description: string;
    tags: string[];
    Category: CategoryInterface;
    writtenDate: string;
    updatedDate: string;
    url: string;
}