interface sys {
    id: string,
    firstPublishedAt: Date,
    publishedAt: Date
}

export interface Blog {
    id: string,
    title: string,
    author: string,
    description: string,
}

export interface ContentfulBlog {
    id: string,
    title: string,
    author: string,
    description: string,
    sys: sys,
}

export interface SingleBlog {
    blog: ContentfulBlog
}

export interface BlogCollection {
    blogCollection: {
        blogs: ContentfulBlog[]
    }
}