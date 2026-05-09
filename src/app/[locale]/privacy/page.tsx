import En from "./_content/en";
import Sl from "./_content/sl";
import It from "./_content/it";
import De from "./_content/de";
import LegalLayout from "@/components/LegalLayout";

const CONTENT: Record<string, () => JSX.Element> = { en: En, sl: Sl, it: It, de: De };

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const Content = CONTENT[params.locale] ?? En;
  return (
    <LegalLayout locale={params.locale}>
      <Content />
    </LegalLayout>
  );
}
