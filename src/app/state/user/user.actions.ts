import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/api/model/user';

export const loadUsers = createAction(
    '[User] Load Users'
);

export const usersLoaded = createAction(
    '[User] Users Loaded',
    props<{users: User[]}>()
);

export const createUser = createAction(
    '[User] Create User',
    props<User>()
);

export const updateUser = createAction(
    '[User] Edit User',
    props<{user: User,id: number}>()
);

export const deleteUser = createAction(
    '[User] Delete User',
    props<{id: number}>()
);

export const userCreated = createAction(
    '[User] User created',
    props<{user: User,id: number}>()
);

export const userUpdated = createAction(
    '[User] User updated',
    props<{user: User,id: number}>()
);

export const userDeleted = createAction(
    '[User] User Deleted',
    props<{id: number}>()
);

export const emailAlreadyExists = createAction(
    '[User] Email already exists'
)

export const cpfAlreadyExists = createAction(
    '[User] CPF already exists'
);

export const searchByCpf = createAction(
    '[User] Search by CPF',
    props<{cpf: string}>()
)

export const foundedByCPF = createAction(
    '[User] Founded by CPF',
    props<{users: User[]}>()
)