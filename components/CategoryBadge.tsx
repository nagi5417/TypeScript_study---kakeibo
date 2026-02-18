type CategoryBadgeProps = {
    category: string,
}

export function CategoryBadge(categoryBadge: CategoryBadgeProps) {

    const colors: { [key: string]: string} =
        { "食費": "green", "住居費": "blue", "交通費": "orange", "娯楽": "purple", "給料": "goldenrod", "副業": "teal", "その他": "gray"};
    
    return (
        <>
            <span style={{backgroundColor: colors[categoryBadge.category], color: "white", padding: "2px 8px", borderRadius: "4px" }}>{categoryBadge.category}</span>
        </>
    )
}