import { type Backend, ExternalBlob, createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMemo } from "react";

const CANISTER_ID = (import.meta.env.VITE_CANISTER_ID_BACKEND as string) || "";

// Stub upload/download since backend has no file methods yet — using object-storage URLs directly
async function uploadFile(_file: ExternalBlob): Promise<Uint8Array> {
  return new Uint8Array();
}

async function downloadFile(_bytes: Uint8Array): Promise<ExternalBlob> {
  return ExternalBlob.fromURL("");
}

export function useBackend(): Backend | null {
  const { identity } = useInternetIdentity();

  return useMemo(() => {
    if (!CANISTER_ID) return null;
    try {
      return createActor(CANISTER_ID, uploadFile, downloadFile, {
        agentOptions: identity ? { identity } : undefined,
      });
    } catch {
      return null;
    }
  }, [identity]);
}
