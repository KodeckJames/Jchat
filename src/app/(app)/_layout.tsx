import { db } from '@/utils'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  //  const { user } = db.useAuth();
  return (
    <>
      <db.SignedIn>
        <Stack />
      </db.SignedIn>
      <db.SignedOut>
        <Redirect href={'/auth'} />
      </db.SignedOut>
      {/* You can also do: */}
      {/*
  if (!user) {
    return <Redirect href="/auth" />;
  }
  return <Stack />; 
  */}
    </>
  )
}
