import {PrimaryColumn, Column} from "../../../src/decorator/Columns";
import {Table} from "../../../src/decorator/Tables";
import {PostDetails} from "./PostDetails";
import {ManyToMany} from "../../../src/decorator/Relations";
import {PostCategory} from "./PostCategory";
import {PostAuthor} from "./PostAuthor";
import {PostInformation} from "./PostInformation";
import {PostImage} from "./PostImage";
import {PostMetadata} from "./PostMetadata";

@Table("sample4_post")
export class Post {

    @PrimaryColumn("int", { autoIncrement: true })
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    // post has relation with category, however inverse relation is not set (category does not have relation with post set)
    @ManyToMany<PostCategory>(true, () => PostCategory, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    category: PostCategory[] = [];

    // post has relation with details. cascade inserts here means if new PostDetails instance will be set to this 
    // relation it will be inserted automatically to the db when you save this Post entity
    @ManyToMany<PostDetails>(true, () => PostDetails, details => details.posts, {
        cascadeInsert: true
    })
    details: PostDetails[] = [];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany<PostImage>(true, () => PostImage, image => image.posts, {
        cascadeUpdate: true
    })
    image: PostImage[] = [];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany<PostMetadata>(true, () => PostMetadata, metadata => metadata.posts, {
        cascadeRemove: true
    })
    metadata: PostMetadata[] = [];

    // post has relation with details. full cascades here
    @ManyToMany<PostInformation>(true, () => PostInformation, information => information.posts, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    information: PostInformation[] = [];

    // post has relation with details. not cascades here. means cannot be persisted, updated or removed
    @ManyToMany<PostAuthor>(true, () => PostAuthor, author => author.posts)
    author: PostAuthor[] = [];

}