export default function QuestionsAndAnswers() {
    return (
        <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
            <div className="px-8 py-12 md:p-12">
                <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
                Questions and Answers
                </p>
                <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
                Have questions? We have answers!
                </h2>
                <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
                    <p className="font-normal text-base md:text-lg">
                    <strong className="font-medium text-black">
                        Want to go yellow?
                    </strong>
                    </p>
                    <p className="text-neutral-600 text-base md:text-lg">
                    Hope to get to the Lemon Llamas!
                    </p>
                </div>
                <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
                    <p className="font-normal text-base md:text-lg">
                    <strong className="font-medium text-black">
                    Want to go red? 
                        <span className="font-normal text-neutral-600 lowercase">
                         (orga)
                        </span>
                    </strong>
                    </p>
                    <p className="text-neutral-600 text-base md:text-lg">
                    Go for red rhinos!
                    </p>
                </div>
            </div>
        </section>
    );
}