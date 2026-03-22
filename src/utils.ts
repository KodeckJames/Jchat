import { init, i, InstaQLEntity } from '@instantdb/react-native';
import schema from '@/instant.schema';

export const APP_ID = process.env.EXPO_PUBLIC_APP_ID;

if (!APP_ID) {
  throw new Error("You need to set an App ID")
}
// const schema = i.schema({
//   entities: {
//     colors: i.entity({
//       value: i.string(),
//     }),
//   },
// });

export const db = init({ appId: APP_ID, schema });

export function useProfile() {
  const { user, error: userError } = db.useAuth();

  const { data, error } = db.useQuery(user?.id ? {
    profiles: {
      $: { where: { "user.id": user.id } },
    }
  } : null);

  if (userError) { return { profile: undefined, error: userError }; }
  if (!user) { return { profile: undefined, error: null }; }

  return {
    profile: data?.profiles?.[0],
    error,
  };
}