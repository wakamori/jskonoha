/****************************************************************************
 * Copyright (c) 2012, the Konoha project authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ***************************************************************************/

#include "mod_sample.h"

#define MTD0(m)                         void m##_
#define MTD1(m,T1)                      void m##_##T1
#define MTD2(m,T1,T2)                   void m##_##T1##T2
#define MTD3(m,T1,T2,T3)                void m##_##T1##T2##T3
#define MTD4(m,T1,T2,T3,T4)             void m##_##T1##T2##T3##T4
#define MTD5(m,T1,T2,T3,T4,T5)          void m##_##T1##T2##T3##T4##T5
#define MTD6(m,T1,T2,T3,T4,T5,T6)       void m##_##T1##T2##T3##T4##T5##T6
#define MTD7(m,T1,T2,T3,T4,T5,T6,T7)    void m##_##T1##T2##T3##T4##T5##T6##T7
#define MTD8(m,T1,T2,T3,T4,T5,T6,T7,T8) void m##_##T1##T2##T3##T4##T5##T6##T7##T8

#ifdef __cplusplus
extern "C" {
#endif


//## Sample.f(int, int);
MTD2(Sample_f, int, int) (CTX, ksfp_t *sfp, long _rix)
{
    fprintf(stderr, "bar\n");
}

//## Sample.f(int, int);
void Sample_f(CTX, ksfp_t *sfp, long _rix)
{
    fprintf(stderr, "foo\n");
}

#ifdef __cplusplus
}
#endif
