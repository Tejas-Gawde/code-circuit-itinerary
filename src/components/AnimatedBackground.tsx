export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="blob1 absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full 
        bg-primary/30 mix-blend-multiply blur-[80px] animate-blob" />
            <div className="blob2 absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full 
        bg-primary/20 mix-blend-multiply blur-[80px] animate-blob animation-delay-2000" />
            <div className="blob3 absolute bottom-[40%] right-[20%] w-[400px] h-[400px] rounded-full 
        bg-primary/20 mix-blend-multiply blur-[80px] animate-blob animation-delay-4000" />
        </div>
    );
}