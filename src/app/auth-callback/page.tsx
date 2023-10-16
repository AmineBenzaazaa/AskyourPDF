import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("dashboard");

  const { data, isLoading } = await trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
  });

  return <div></div>;
};

export default Page;
