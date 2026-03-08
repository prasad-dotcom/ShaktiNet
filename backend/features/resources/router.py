"""features/resources/router.py — Static public data: helplines + legal rights."""
from fastapi import APIRouter

router = APIRouter(prefix="/resources", tags=["Resources"])


@router.get("/helplines")
def helplines():
    """[Public] Emergency helplines for women in India."""
    return {
        "emergency": [
            {"name": "Women Helpline",     "number": "1091",          "available": "24/7"},
            {"name": "Police Emergency",   "number": "100",           "available": "24/7"},
            {"name": "National Emergency", "number": "112",           "available": "24/7"},
        ],
        "mental_health": [
            {"name": "iCall (TISS)",            "number": "9152987821",    "available": "Mon-Sat 8am-10pm"},
            {"name": "Vandrevala Foundation",   "number": "1860-2662-345", "available": "24/7"},
        ],
        "legal": [
            {"name": "Legal Aid Services", "number": "1800-419-1090", "available": "24/7"},
            {"name": "NCW Helpline",        "number": "7827-170-170",  "available": "24/7"},
        ],
        "domestic_violence": [
            {"name": "iCall DV Support",   "number": "9152987821"},
            {"name": "Snehi Foundation",   "number": "044-24640050"},
        ],
    }


@router.get("/rights")
def womens_rights():
    """[Public] Key legal rights every woman should know."""
    return [
        {
            "right": "Right Against Workplace Harassment",
            "law": "POSH Act 2013",
            "summary": "Every workplace with 10+ employees must have an Internal Complaints Committee.",
        },
        {
            "right": "Right to Equal Pay",
            "law": "Equal Remuneration Act 1976",
            "summary": "Women must receive equal pay for equal work.",
        },
        {
            "right": "Right to Maternity Benefit",
            "law": "Maternity Benefit Act 1961 (amended 2017)",
            "summary": "26 weeks paid maternity leave for organisations with 10+ employees.",
        },
        {
            "right": "Right Against Domestic Violence",
            "law": "Protection of Women from DV Act 2005",
            "summary": "Covers physical, emotional, sexual, and economic abuse.",
        },
        {
            "right": "Right to Free Legal Aid",
            "law": "Legal Services Authorities Act 1987",
            "summary": "Every woman is entitled to free legal aid regardless of income.",
        },
        {
            "right": "Right to Property",
            "law": "Hindu Succession (Amendment) Act 2005",
            "summary": "Daughters have equal right to ancestral property.",
        },
    ]
