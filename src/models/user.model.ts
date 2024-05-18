import { Model, QueryContext } from 'objection';
import { encodePassword } from "../utils/encript.password";


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              isGoogle:
 *                  type: boolean
 *              isDisabled:
 *                  type: boolean
 *              isDeleted:
 *                  type: boolean
 *              isValidated:
 *                  type: boolean
 *              lastSignIn:
 *                  type: Date
 *              img:
 *                  type: string
 *              rol:
 *                  type: string
 *          required:
 *              -name
 *              -lastname
 *              -email
 *              -password
 */

interface UserInterface {
  id: number;
  name: string;
  username: string;
  lastname: string;
  email: string;
  password: string;
  birth?: string; // Date of birth (optional)
  gender?: 'Male' | 'Female' | 'Other'; // Gender (optional)
  puser_type_id?: number; // User type ID (optional)
  is_connected?: boolean;
  is_google?: boolean;
  is_disabled?: boolean;
  is_deleted?: boolean;
  created_at?: string; // Timestamp (optional)
  updated_at?: string; // Timestamp (optional)
}




class UserModel extends Model implements UserInterface {
  id: number;
  name: string;
  username: string;
  lastname: string;
  email: string;
  password: string;
  birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  puser_type_id?: number;
  is_connected?: boolean;
  is_google?: boolean;
  is_disabled?: boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  $beforeInsert(queryContext: QueryContext): void | Promise<any> {
    this.password = encodePassword(this.password);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'lastname', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        lastname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email', maxLength: 255 },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        birth: { type: 'string', format: 'date' },
        gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
        puser_type_id: { type: 'integer' },
        is_connected: { type: 'boolean' },
        is_google: { type: 'boolean' },
        is_disabled: { type: 'boolean' },
        is_deleted: { type: 'boolean' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default UserModel;
