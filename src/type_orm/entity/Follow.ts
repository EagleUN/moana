import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follows {
  @PrimaryGeneratedColumn("uuid")
  private id: string | undefined;

  @Column()
  private follower_id: string | undefined;

  @Column()
  private following_id: string | undefined;

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

  public getFollowerId(): string | undefined {
    return this.follower_id;
  }

  public getFollowingId(): string | undefined {
    return this.following_id;
  }
}