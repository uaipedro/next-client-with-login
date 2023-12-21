import Image from "next/image";
import styles from "./page.module.css";
import SinginForm from "@/app/components/SinginForm";

export default function Home() {
  return (
    <main className="container">
      <SinginForm />
    </main>
  );
}
