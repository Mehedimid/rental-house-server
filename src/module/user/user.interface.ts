export interface TCreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'tenant' | 'landlord';
  isBlocked: boolean;
  isActive: boolean;
  imageUrl: string;
}

export interface TUpdateUserStatus {
  isActive: boolean;
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
