import prisma from "../lib/prisma";

async function main() {
    const foodCategory = await prisma.category.create({
        data: {name: "食費", color: "green"}
    })

    const housingCategory = await prisma.category.create({
        data: {name: "住居費", color: "blue"}
    })

    const transportCategory = await prisma.category.create({
        data: {name: "交通費", color: "orange"}
    })

    const entertainmentCategory = await prisma.category.create({
        data: {name: "娯楽", color: "purple"}
    })

    const salaryCategory = await prisma.category.create({
        data: {name: "給料", color: "goldenrod"}
    })

    const sideJobCategory = await prisma.category.create({
        data: {name: "副業", color: "teal"}
    })

    const otherCategory = await prisma.category.create({
        data: {name: "その他", color: "gray"}
    })

    const testUser = await prisma.user.create({
        data: {email: "test@example.com", password: "password123"}
    })

    await prisma.transaction.create({
        data: {
            title: "スーパーで買い物",
            amount: 3000,
            userId: testUser.id,
            type: "expense",
            date: new Date("2026-02-10"),
            categoryId: foodCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "家賃",
            amount: 250000,
            userId: testUser.id,
            type: "expense",
            date: new Date("2026-02-05"),
            categoryId: housingCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "電車",
            amount: 1500,
            userId: testUser.id,
            type: "expense",
            date: new Date("2026-02-18"),
            categoryId: transportCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "サウナ",
            amount: 1000,
            userId: testUser.id,
            type: "expense",
            date: new Date("2026-02-08"),
            categoryId: entertainmentCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "給料",
            amount: 500000,
            userId: testUser.id,
            type: "income",
            date: new Date("2026-02-25"),
            categoryId: salaryCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "副業収入",
            amount: 200000,
            userId: testUser.id,
            type: "income",
            date: new Date("2026-02-10"),
            categoryId: sideJobCategory.id,
        }
    })

    await prisma.transaction.create({
        data: {
            title: "銀行手数料",
            amount: 300,
            userId: testUser.id,
            type: "expense",
            date: new Date("2026-02-27"),
            categoryId: otherCategory.id,
        }
    })

}

main()