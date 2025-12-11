import React from "react";

export default function FormWrapper({ title, children }) {
  return (
    <form className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-md border mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
      
    </form>
  );
}
