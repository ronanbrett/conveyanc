import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { isAuthenticated$ } from '../auth/auth.plugin';
import { take } from 'rxjs/operators';

export const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = await isAuthenticated$.pipe(take(1)).toPromise();
  if (isAuthenticated) {
    return next();
  } else {
    next({ path: '/about' });
  }
};
