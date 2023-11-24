import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useIncrement } from '../src/hooks/useIncrement.js';

describe('useIncrement', () => {
    it('should use the default value', () => {
        const { result } = renderHook(() => useIncrement({ base: 5 }));
        expect(result.current.count).toBe(5);
    });

    it('should use increment value', () => {
        const { result } = renderHook(() => useIncrement({ base: 5 }));
        act(() => result.current.increment());
        expect(result.current.count).toBe(6);
    });

    it('should use not bypass max', () => {
        const { result } = renderHook(() => useIncrement({ base: 5, max: 7 }));
        act(() => result.current.increment());
        act(() => result.current.increment());
        act(() => result.current.increment());
        expect(result.current.count).toBe(7);
    });

    // Generated test by Codeium
    it('should initialize count with the base value', () => {
        const { result } = renderHook(() => useIncrement({ base: 5 }));

        expect(result.current.count).toBe(5);
    });

    it('should increment count by 1 when increment is called and count is less than max', () => {
        const { result } = renderHook(() => useIncrement({ base: 0, max: 10 }));

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(1);
    });

    it('should not increment count when increment is called and count is equal to max', () => {
        const { result } = renderHook(() => useIncrement({ base: 10, max: 10 }));

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(10);
    });

    it('should decrement count by 1 when decrement is called and count is greater than min', () => {
        const { result } = renderHook(() => useIncrement({ base: 5, min: 0 }));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(4);
    });

    it('should not decrement count when decrement is called and count is equal to min', () => {
        const { result } = renderHook(() => useIncrement({ base: 0, min: 0 }));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(0);
    });
});
