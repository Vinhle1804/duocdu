'use client'

import { useAppContext } from "../context/AppProvider";

export default function Home() {
  const { user } = useAppContext();
  console.log(user);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}
