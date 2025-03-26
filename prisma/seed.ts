import { PrismaClient } from '@prisma/client';
import { fraquezaSeed } from "./seeds/fraquezaSeed";
import { pokemonSeed } from "./seeds/pokemonSeed";
import { tipoSeed } from "./seeds/tipoSeed";

const prisma = new PrismaClient();

async function main() {
    await tipoSeed();
    await fraquezaSeed();
    await pokemonSeed();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
