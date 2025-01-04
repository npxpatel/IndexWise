interface HeaderProps {
    title: string;
    subtitle?: string;
  }
  
  export function Header({ title, subtitle }: HeaderProps) {
    return (
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }