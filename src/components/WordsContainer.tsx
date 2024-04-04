
const WordsContainer = ({ children }: {children: React.ReactNode }) => {
    return (
        <div className="relative text-xl max-w-4xl leading-relaxed break-all mt-3">
            {children}
        </div>
    )
}

export default WordsContainer;