import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  private id: string | undefined;

  @Column()
  private createdAt: Date;

  @Column()
  private idCreator: string;

  @Column()
  private content: string;

  public constructor(
    createdAt: Date,
    idCreator: string,
    content: string,
  ) {
    this.createdAt = createdAt;
    this.idCreator = idCreator;
    this.content = content;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getIdCreator(): string {
    return this.idCreator;
  }

  public getContent(): string {
    return this.content;
  }
}