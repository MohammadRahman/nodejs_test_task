// import { PrimaryGeneratedColumn } from 'typeorm';

// export class AbstractEntity<T> {
//   @PrimaryGeneratedColumn()
//   id: number;

//   constructor(entity: Partial<T>) {
//     Object.assign(this, entity);
//   }
// }

import { ObjectIdColumn, ObjectId } from 'typeorm';
export class AbstractEntity<T> {
  @ObjectIdColumn()
  _id: ObjectId;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
