import { Session } from "next-auth/types";

const isAuthorized = (
  session: Session | null,
  authorizedRoles: string[]
): boolean => {
  if (!session) {
    return false;
  }

  let isAuthorized = false;

  authorizedRoles.forEach((authorizedRole: string) => {
    if (session?.user.role === authorizedRole) {
      isAuthorized = true;
    }
  });

  return isAuthorized;
};

export default isAuthorized;
