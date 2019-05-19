import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follows {
  @PrimaryGeneratedColumn("uuid")
  private id: string | undefined;

  @Column()
  private follower_id: string;

  @Column()
  private following_id: string;

  public constructor(
    followerId: string,
    followingId: string,
  ) {
    this.follower_id = followerId;
    this.following_id = followingId;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getFollowerId(): string {
    return this.follower_id;
  }

  public getFollowingId(): string {
    return this.following_id;
  }
}