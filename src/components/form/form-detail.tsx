import { Dispatch, RefObject, SetStateAction } from 'react';
import { IFormQuestion } from '../../interfaces/form-question';

interface FormDetailProps {
  form: IFormQuestion;
  activeBox: number;
  setActiveBox: Dispatch<SetStateAction<number>>;
  inputRef: RefObject<HTMLInputElement>;
}

export default function FormDetail({
  form,
  activeBox,
  setActiveBox,
  inputRef,
}: FormDetailProps) {
  const getAnswerClass = (index: number) =>
    `w-full border border-blue-600 cursor-pointer  border-opacity-20 rounded-md p-5 text-xl tracking-wider my-2  hover:bg-blue-600 hover:text-gray-50 transition-all  ${
      index == activeBox ? getActiveClass() : ' text-gray-500 '
    }`;

  const getActiveClass = () => ' bg-blue-600 text-gray-50 ';

  return (
    <div className="relative">
      <div className="center">
        <div className="text-center font-bold w-1/2 mb-6 mt-2 text-gray-800 tracking-wide text-2xl ">
          {form.question}
        </div>
      </div>
      <div className="hr"></div>
      {/* Answer */}
      <div className="overflow-y-scroll scrollbar-hide h-[300px]">
        {form.answerValue.length == 0 ? (
          <input
            ref={inputRef}
            placeholder={form.answer[0]}
            type=""
            className="w-full p-2 bg-transparent rounded-md border border-blue-600 border-opacity-20"
          />
        ) : (
          form.answer.map((answer, index) => (
            <div
              onClick={() => setActiveBox(index)}
              key={index}
              className={getAnswerClass(index)}
            >
              {answer}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
