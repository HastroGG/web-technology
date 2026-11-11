import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [sent, setSent] = useState(false);
    useEffect(() => {
            document.title = "Kayıt Ol - Kampüs Etkinlikleri";
        }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const found: any = {};
        if (name.trim().length < 3) found.name = "Ad en az 3 karakter olmalı.";
        if (!email.includes("@")) found.email = "Geçerli e-posta girin.";
        if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
        if (password !== password2) found.password2 = "Şifreler aynı değil.";
        setErrors(found);
        setSent(Object.keys(found).length === 0);
    }

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label>Ad Soyad</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="hata-metni">{errors.name}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>E-posta</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className="hata-metni">{errors.email}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Şifre</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span className="hata-metni">{errors.password}</span>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Şifre (Tekrar)</label>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Kayıt ol</button>
            </form>
            {sent && <p style={{ color: 'green', marginTop: '10px' }}>Kayıt başarılı (Demo)</p>}
            <p style={{ marginTop: '15px' }}>Zaten hesabın var mı? <Link to="/login">Giriş yap</Link></p>
        </div>
    );
}