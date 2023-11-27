import Link from 'next/link';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Footer() {
    return (
        <div style={{ overflow: 'hidden', marginTop: 20 }}>
            <div
                style={{
                    backgroundColor: 'black',
                    padding: 6,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <h1
                    style={{ textAlign: 'center', color: 'white', fontWeight: 400 }}
                    className="text-lg"
                >
                    @CTU.LinguTechies - GPL V3 License - 2023
                </h1>
                <a
                    target="_blank"
                    style={{
                        width: 18,
                        marginLeft: 10,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    href="https://github.com/CTU-LinguTechies/VN-Law-Advisor"
                >
                    <FontAwesomeIcon icon={faGithub} color="white" />
                </a>
            </div>
        </div>
    );
}
