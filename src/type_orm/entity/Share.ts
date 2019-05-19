import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Share {
  @PrimaryGeneratedColumn("uuid")
  private id: string | undefined;

  @Column()
  private userId: string;

  @Column()
  private postId: string;

  public constructor(
    userId: string,
    postId: string,
  ) {
    this.userId = userId;
    this.postId = postId;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getPostId(): string {
    return this.postId;
  }
}