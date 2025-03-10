import SignInForm from "@/components/SignInForm/SignInForm";
import SignInSkeleton from "@/components/SignInForm/SignInSkeleton";
import { Suspense } from "react";



export default function Home() {
  return (
    <div className="w-full h-full flex items-center p-4 flex-col gap-2.5">
      <h1 className="font-extrabold text-3xl">Auth Store</h1>
      <div className="flex-1 flex items-center">
        <Suspense fallback={ <SignInSkeleton /> }>

          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
