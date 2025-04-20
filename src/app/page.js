"use client";
import Image from "next/image";
import CategoryList from "../../components/CategoryList";
import 'bulma/css/bulma.min.css';

export default function Home() {
  return (
    <>
      
      <h1 className="title is-3">Liste des Categories</h1>
      <CategoryList />
    </>
  );
}
