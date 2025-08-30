"use client";

import { useRouter } from "next/navigation";

interface SubmissionModalProps {
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
}

export default function SubmissionModal({ submitted, setSubmitted }: SubmissionModalProps) {
  const router = useRouter();

  if (!submitted) return null;

  const handleClose = () => {
    setSubmitted(false);
    router.push("/"); // redirect to homepage
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071134] bg-opacity-50">
      <div className="bg-white dark:bg-[#071134] rounded-2xl p-6 max-w-lg w-full text-center text-black dark:text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">🚀 Thank you!</h1>
        <p className="text-center mb-6">
          Your business has been submitted and is{" "}
          <strong>awaiting approval</strong>. Once approved by the Team, it
          will appear on the map. Thank you for helping grow the StableSpots!
        </p>
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-[#071134] hover:bg-[#0a1f3d] text-white rounded-lg font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
