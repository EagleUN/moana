import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follows {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column()
  public follower_id: string;

  @Column()
  public following_id: string;

  public constructor(
    followerId: string,
    followingId: string,
  ) {
    this.follower_id = followerId;
    this.following_id = followingId;
  }
}