export interface TCreateUser {
  name: string;
  email: string;
  number: string;
  password: string;
  role: 'admin' | 'tenant' | 'landlord';
  isBlocked: boolean;
  isActive: boolean;
  imageUrl: string;
}

export interface TUpdateUserStatus {
  id: string;
  action: string;
}

export interface UserModelStatics {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isUserExistsByCustomId(email: string): Promise<TCreateUser | null>;
}
