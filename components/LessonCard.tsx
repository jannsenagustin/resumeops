export type EngineeringLesson = {
  title: string;
  description: string;
};

type LessonCardProps = {
  lesson: EngineeringLesson;
};

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-950 p-5">
      <h3 className="font-semibold text-white">{lesson.title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-400">
        {lesson.description}
      </p>
    </article>
  );
}
