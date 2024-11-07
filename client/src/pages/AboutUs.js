import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";

export default function AboutUs() {
  return (
    <div className="bg-[#F8F3EB] min-h-screen flex flex-col">

      <div>
        <Header />
      </div>

      <section className="flex flex-col font-IBM place-self-center my-20 mx-8 max-w-3xl gap-9">
        <h2 className="text-[#6B4E45] text-3xl md:text-4xl font-[750] text-right">
          عن إسناد
        </h2>
        <p className="text-[#231F20] text-lg md:text-xl text-right">
          إسناد هو نموذج ذكاء اصطناعي تم صقله عن طريق نموذج علام . مصمم خصيصًا
          للإجابة على أسئلة المستخدمين المتعلقة بالقصائد. يمكنه مساعدتك في
          التعرف على صاحب القصيدة، وفهم معاني كلماتها، واستكشاف قصصها. يعد إسناد
          دليلك الشامل لفهم أصول وخبايا القصائد ومصادرها، مما يثري معرفتك بالشعر
          العربي
        </p>

        <h2 className="font-IBM font-[750] text-[#6B4E45] text-3xl md:text-4xl text-right">
          طريقة الاستخدام
        </h2>
        <p className="font-IBM text-[#231F20] text-lg md:text-xl text-right">
          يمكنك سؤال إسناد ماتريد عن الشعر العربي في المساحة المخصصة لكتابة
          السؤال ، وبالطبع سيجيبك بأفضل إجابة ممكنة ، لكن خارج إطار الشعر إسناد
          لن يجيب
        </p>

        <Link to="/">
          <button className="bg-[#231F20] text-white rounded-lg px-4 py-2 md:px-6 md:py-2 hover:bg-[#3b2a25]">
            الرئيسية
          </button>
        </Link>
      </section>

    </div>
  );
}
