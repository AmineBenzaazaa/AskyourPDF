import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextPage } from "next";
import { redirect } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  return <div>{user.family_name}</div>;
};

export default Page;
