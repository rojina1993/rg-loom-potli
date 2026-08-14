"use client";
import { useRouter } from "next/navigation";
export function OrderLink({ label = "Order Now", className = "" }: { label?: string; className?: string }) { const router = useRouter(); return <button onClick={() => router.push("/checkout?plan=classic&qty=1")} className={className}>{label}</button>; }
