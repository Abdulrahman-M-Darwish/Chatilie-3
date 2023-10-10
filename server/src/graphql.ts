
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Privacy {
    PRIVATE = "PRIVATE",
    FRIENDS = "FRIENDS",
    PUBLIC = "PUBLIC"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Relationship {
    MARRIED = "MARRIED",
    SINGLE = "SINGLE"
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput {
    email: string;
    password: string;
    name: string;
    username: string;
    birthDate: DateTimeISO;
    avatar: string;
}

export interface UploadImageInput {
    base64EncodedImage?: Nullable<string>;
    type?: Nullable<string>;
}

export interface UploadImagesInput {
    base64EncodedImages?: Nullable<Nullable<string>[]>;
    type?: Nullable<string>;
}

export interface CreateMessageInput {
    text?: Nullable<string>;
    mediaUrl?: Nullable<string[]>;
    followerId?: Nullable<string>;
}

export interface CreatePostInput {
    privacy?: Nullable<Privacy>;
    imagesSrc?: Nullable<Nullable<string>[]>;
    text?: Nullable<string>;
}

export interface UpdateProfileInput {
    cover?: Nullable<string>;
    country?: Nullable<string>;
    bio?: Nullable<string>;
    hobbies?: Nullable<string[]>;
    livesIn?: Nullable<string>;
    education?: Nullable<string>;
    worksAt?: Nullable<string>;
    relationship?: Nullable<Relationship>;
    certificates?: Nullable<string[]>;
}

export interface UpdateUserInput {
    isActive?: Nullable<boolean>;
    avatar?: Nullable<string>;
    username?: Nullable<string>;
}

export interface IMutation {
    login(loginInput: LoginInput): User | Promise<User>;
    signup(signupInput: SignupInput): User | Promise<User>;
    logout(): User | Promise<User>;
    uploadImage(uploadImageInput: UploadImageInput): Image | Promise<Image>;
    uploadImages(uploadImagesInput: UploadImagesInput): Image[] | Promise<Image[]>;
    createComment(followingId: string): Nullable<Comment> | Promise<Nullable<Comment>>;
    removeComment(commentId: string): Nullable<Comment> | Promise<Nullable<Comment>>;
    createFollower(followingId: string): Nullable<Follower> | Promise<Nullable<Follower>>;
    removeFollower(followerId: string): Nullable<Follower> | Promise<Nullable<Follower>>;
    createMessage(createMessageInput?: Nullable<CreateMessageInput>): Message | Promise<Message>;
    updateMessage(id: string, updateMessageInput?: Nullable<CreateMessageInput>): Message | Promise<Message>;
    removeMessage(id: string): Message | Promise<Message>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    updatePost(id: string, updatePostInput?: Nullable<CreatePostInput>): Post | Promise<Post>;
    removePost(id: string): Post | Promise<Post>;
    createProfile(id: string): Profile | Promise<Profile>;
    updateProfile(id: string, updateProfileInput: UpdateProfileInput): Profile | Promise<Profile>;
    removeProfile(id: string): Nullable<Profile> | Promise<Nullable<Profile>>;
    createUser(createUserInput?: Nullable<SignupInput>): User | Promise<User>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): User | Promise<User>;
    removeUser(id: string): User | Promise<User>;
}

export interface Image {
    public_id?: Nullable<string>;
    version?: Nullable<number>;
    signature?: Nullable<string>;
    width?: Nullable<number>;
    height?: Nullable<number>;
    format?: Nullable<string>;
    resource_type?: Nullable<string>;
    created_at?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    pages?: Nullable<number>;
    bytes?: Nullable<number>;
    type?: Nullable<string>;
    etag?: Nullable<string>;
    placeholder?: Nullable<boolean>;
    url?: Nullable<string>;
    secure_url?: Nullable<string>;
    access_mode?: Nullable<string>;
    original_filename?: Nullable<string>;
    moderation?: Nullable<Nullable<string>[]>;
    access_control?: Nullable<Nullable<string>[]>;
}

export interface IQuery {
    findImage(imageId: string): Image | Promise<Image>;
    comments(id: string): Nullable<Comment[]> | Promise<Nullable<Comment[]>>;
    comment(commentId: string): Nullable<Comment> | Promise<Nullable<Comment>>;
    followers(id: string): Nullable<Follower[]> | Promise<Nullable<Follower[]>>;
    follower(followerId: string): Nullable<Follower> | Promise<Nullable<Follower>>;
    messages(followId?: Nullable<string>): Nullable<Message[]> | Promise<Nullable<Message[]>>;
    message(chatId?: Nullable<string>): Nullable<Message> | Promise<Nullable<Message>>;
    posts(id?: Nullable<string>): Nullable<Post[]> | Promise<Nullable<Post[]>>;
    post(id: string): Post | Promise<Post>;
    profile(id: string): Nullable<Profile> | Promise<Nullable<Profile>>;
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
    user(id: string): User | Promise<User>;
}

export interface Comment {
    commenter?: Nullable<Post>;
    commenterId?: Nullable<string>;
    commenting?: Nullable<Post>;
    commentingId?: Nullable<string>;
}

export interface Follower {
    id: string;
    follower: User;
    followerId: string;
    following: User;
    followingId: string;
    messages: Nullable<Message>[];
    createdAt: DateTimeISO;
}

export interface Message {
    id: string;
    text?: Nullable<string>;
    mediasUrl?: Nullable<string[]>;
    author: User;
    authorId: string;
    createdAt: DateTimeISO;
    updatedAt: string;
    follows?: Nullable<Follower>;
    followsFollowerId?: Nullable<string>;
    followsFollowingId?: Nullable<string>;
}

export interface ISubscription {
    messageCreated(): Nullable<Message> | Promise<Nullable<Message>>;
}

export interface Post {
    id: string;
    text?: Nullable<string>;
    imagesSrc?: Nullable<string[]>;
    author: User;
    authorId: string;
    privacy: Privacy;
    comments: number;
    likes: number;
    shares: number;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export interface Profile {
    id: string;
    cover?: Nullable<string>;
    country?: Nullable<string>;
    bio?: Nullable<string>;
    gender?: Nullable<Gender>;
    livesIn?: Nullable<string>;
    education?: Nullable<string>;
    worksAt?: Nullable<string>;
    relationship?: Nullable<Relationship>;
    certificates: string[];
    hobbies: string[];
    likes?: Nullable<number>;
    friends?: Nullable<number>;
    reputation?: Nullable<number>;
    user: User;
    userId: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    avatar: string;
    birthDate: DateTimeISO;
    username: string;
    following?: Nullable<Follower[]>;
    followedBy?: Nullable<Follower[]>;
    posts?: Nullable<Post[]>;
    messages?: Nullable<Message[]>;
    profile?: Nullable<Profile>;
}

export type DateTimeISO = any;
type Nullable<T> = T | null;
