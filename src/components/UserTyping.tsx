
const UserTyping = ({ userInput, className }: { userInput: string, className?: string }) => {

    const typedCharacters = userInput.split('');

    return (
        <div className={className}>
            {typedCharacters.map((char, index) => {
                const key = `${char}_${index}`
                return <Character key={key} char={char} />
            })}
        </div>
    );
};

const Character = ({char}: {char: string})=> {
    return <span className="text-primary-400">{char}</span>;
}

export default UserTyping;