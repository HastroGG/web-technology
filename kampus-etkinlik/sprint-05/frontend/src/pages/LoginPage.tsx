import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [sent, setSent] = useState(false);
    useEffect(() => {
            document.title = "Giriş Yap - Kampüs Etkinlikleri";
        }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const found: { email?: string; password?: string } = {};
        if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
        if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
        setErrors(found);
        setSent(Object.keys(found).length === 0);
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label>E-posta</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="hata-metni">{errors.email}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="hata-metni">{errors.password}</span>}
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>
                    Giriş yap
                </button>
            </form>
            {sent && <p style={{ color: 'green', marginTop: '10px' }}>Form çalışıyor.</p>}
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/forgot-password">Şifremi unuttum</Link>
                <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
            </div>
        </div>
    );
}