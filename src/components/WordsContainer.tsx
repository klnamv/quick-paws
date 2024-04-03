
const WordsContainer = ({ children }: {children: React.ReactNode }) => {
    return (
        <div className="relative text-xl max-w-5xl leading-relaxed break-all mt-5">
            {children}
        </div>
    )
}

export default WordsContainer;