export default class LoginValidation {
  private static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  private static validatePassword(password: string): boolean {
    if (password.length >= 6) return true;
    return false;
  }

  public static validateLogin(email: string, password: string): boolean {
    return (this.validateEmail(email) && this.validatePassword(password));
  }
}
