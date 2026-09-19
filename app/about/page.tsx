import type { Metadata } from 'next'
import { PoemReader } from '../components/poem-reader'

export const metadata: Metadata = {
  title: 'Sem título, ainda…',
  description: 'Há quem acorde com o sol, dócil e manso.',
}

const poem = `Há quem acorde com o sol, dócil e manso,
Mas tu acordas tarde, contra a manhã que insiste,
Como quem recusa o mundo até que ele mereça
A tua presença inteira, tua chama que persiste.
Brilhante como quem carrega todas as estrelas,
Política em cada gesto, poesia em cada veia,
Entre fumaças de cigarro e xícaras sem fim,
Tua intensidade arde e a mim, que também ardo, incendeia.
Vi-te chorar com o filme de nossas vidas espelhadas,
O filho de mil homens, as famílias que escolhemos,
O amor que não cabe nas caixas que nos deram,
E entendi, somos todos os que fomos e seremos.
És mansa apenas quando o mundo não merece tua pressa,
Sensível como quem sente tudo e se recusa a fingir,
Escreves versos porque existir não basta,
É preciso transfigurar, é preciso resistir.
Que sorte a minha, nesta transição de rumos,
Ter encontrado quem queima como eu queimo,
Bebendo café, fumando sonhos, dividindo o cinema
Duas almas, duas revoltas, o mesmo poema`

export default function About() {
  return (
    <section className="animate-fade-in">
      <h1 className="title font-semibold text-2xl tracking-tighter">
        Sem título, ainda…
      </h1>
      <PoemReader content={poem} />
    </section>
  )
}
