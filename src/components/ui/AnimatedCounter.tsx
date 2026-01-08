import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
    value: string | number;
    duration?: number;
    className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    duration = 1000,
    className = '',
}) => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Parse the value to extract number and suffix
        const valueStr = String(value);
        const match = valueStr.match(/^([\d.]+)(.*)$/);

        if (!match) {
            setDisplayValue(valueStr);
            return;
        }

        const targetNumber = parseFloat(match[1]);
        const suffix = match[2] || '';

        if (hasAnimated || isNaN(targetNumber)) {
            setDisplayValue(valueStr);
            return;
        }

        // Intersection Observer for viewport detection
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    animateValue(targetNumber, suffix);
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    const animateValue = (target: number, suffix: string) => {
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = target * easeOut;
            const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toString();

            setDisplayValue(formatted + suffix);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(target + suffix);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <span ref={elementRef} className={`counter-animate ${className}`}>
            {displayValue}
        </span>
    );
};

export default AnimatedCounter;
