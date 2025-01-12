"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { PhoneInput } from "./PhoneInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
const cities = [
  "Ahmadpur East",
  "Ahmed Nager Chatha",
  "Ali Khan Abad",
  "Alipur",
  "Arifwala",
  "Attock",
  "Bhera",
  "Bhalwal",
  "Bahawalnagar",
  "Bahawalpur",
  "Bhakkar",
  "Burewala",
  "Chillianwala",
  "Chakwal",
  "Chichawatni",
  "Chiniot",
  "Chishtian",
  "Daska",
  "Darya Khan",
  "Dera Ghazi Khan",
  "Dhaular",
  "Dina",
  "Dinga",
  "Dipalpur",
  "Faisalabad",
  "Fateh Jang",
  "Ghakhar Mandi",
  "Gojra",
  "Gujranwala",
  "Gujrat",
  "Gujar Khan",
  "Hafizabad",
  "Haroonabad",
  "Hasilpur",
  "Haveli Lakha",
  "Jalalpur Jattan",
  "Jampur",
  "Jaranwala",
  "Jhang",
  "Jhelum",
  "Kalabagh",
  "Karor Lal Esan",
  "Kasur",
  "Kamalia",
  "Kāmoke",
  "Khanewal",
  "Khanpur",
  "Kharian",
  "Khushab",
  "Kot Adu",
  "Jauharabad",
  "Lahore",
  "Lalamusa",
  "Layyah",
  "Liaquat Pur",
  "Lodhran",
  "Malakwal",
  "Mamoori",
  "Mailsi",
  "Mandi Bahauddin",
  "Mian Channu",
  "Mianwali",
  "Multan",
  "Murree",
  "Muridke",
  "Mianwali Bangla",
  "Muzaffargarh",
  "Narowal",
  "Okara",
  "Renala Khurd",
  "Pakpattan",
  "Pattoki",
  "Pir Mahal",
  "Qaimpur",
  "Qila Didar Singh",
  "Rabwah",
  "Raiwind",
  "Rajanpur",
  "Rahim Yar Khan",
  "Rawalpindi",
  "Sadiqabad",
  "Safdarabad",
  "Sahiwal",
  "Sangla Hill",
  "Sarai Alamgir",
  "Sargodha",
  "Shakargarh",
  "Sheikhupura",
  "Sialkot",
  "Sohawa",
  "Soianwala",
  "Siranwali",
  "Talagang",
  "Taxila",
  "Toba Tek Singh",
  "Vehari"
];
export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  interface AdditionalInfo {
    location?: string;
    cnic_number?: string;
    profile_pic?: string;
    client_type?: string;
    [key: string]: any;
  }

  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({})
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log(email, password, fullName, phoneNumber, role, additionalInfo)
    
  }

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleAdditionalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo({
      ...additionalInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setAdditionalInfo({
      ...additionalInfo,
      [name]: value,
    })
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Select the option that best describes you to proceed with the registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="" onClick={() => setStep(1)} className="text-black-500 hover:underline">
                    Role
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {step >= 2 && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <Link href="" onClick={() => setStep(2)} className="text-blue-500 hover:underline">
                        Details
                      </Link>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {step === 3 && role === "client" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <Link href="" onClick={() => setStep(3)} className="text-blue-500 hover:underline">
                        Additional Details
                      </Link>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          {step === 1 ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-muted-foreground">
                Please select your role to continue with the registration process.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => handleRoleSelect("chamber")} className="w-32 ">
                  Chamber
                </Button>
                <Button onClick={() => handleRoleSelect("client")} className="w-32">
                  Client
                </Button>
              </div>
            </div>
          ) : step === 2 ? (
            <form onSubmit={(e) => { e.preventDefault(); role === "client" ? setStep(3) : handleRegister(e) }} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <PhoneInput
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  required
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              {role === "chamber" && (
                <>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="chamber_name"
                      placeholder="Chamber Name"
                      onChange={handleAdditionalInfoChange}
                      required
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="registration_number"
                      placeholder="Registration Number"
                      onChange={handleAdditionalInfoChange}
                      required
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleAdditionalInfoChange}
                      required
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                </>
              )}
              {role === "client" && (
                <Button className="w-full " type="submit" disabled={loading}>
                  Next
                </Button>
              )}
              {role === "chamber" && (
                <Button className="w-full bg-blue-500 hover:bg-blue-600" type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              )}
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Select
                  value={additionalInfo.location || ""}
                  onValueChange={(value) => handleSelectChange("location", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="cnic_number"
                  placeholder="CNIC Number"
                  onChange={handleAdditionalInfoChange}
                  required
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Select
                  value={additionalInfo.client_type || ""}
                  onValueChange={(value) => handleSelectChange("client_type", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full " type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}