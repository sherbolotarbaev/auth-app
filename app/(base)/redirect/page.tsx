import RedirectClient from "./page.uc";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `Redirecting to ${searchParams.to || "..."}`,
  };
}

export default async function Redirect() {
  return <RedirectClient />;
}
